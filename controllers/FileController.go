package controllers

import (
	"bufio"
	"fmt"
	"github.com/astaxie/beego"
	"os/exec"
	// "github.com/fatih/color"
	// "github.com/sajari/docconv"
	"io"
	// "log"
	"io/ioutil"
	"os"
	"strings"
)

type FileController struct {
	beego.Controller
}

type Sentence struct {
	Sentence          string
	GeneratedSentence string
}

func (this *FileController) CreateEvent() {
	sentence := this.GetString("sentence")
	InputWrapperTerminal(sentence, "InputTextForWordProcessor.txt")
	mystruct := Sentence{}
	mystruct.Sentence = sentence
	mystruct.GeneratedSentence = JSInputReader("OutputWordPropertyPairs.txt")
	this.Data["json"] = &mystruct
	this.ServeJSON()

	exec.Command("python", "./NLTKProcessor.py").Run()

}

/*
Convert Terminal input to text
    Ask for terminal input
    Save to text file
Terminal Input; Chinese Character Support
Text file
*/
func InputWrapperTerminal(str string, targetFile string) {
	// reader := bufio.NewReader(os.Stdin)
	// fmt.Print("Enter text: ")
	// text, _ := reader.ReadString('\n')
	// fmt.Println(text)
	var f *os.File
	f, _ = os.Create(targetFile) //创建文件
	io.WriteString(f, str)
	defer f.Close()
}

/*
   Convert doc/pdf to txt
*/
func InputWrapperDoc(currentFile string, targetFile string) {
	file, err := os.OpenFile(targetFile, os.O_WRONLY|os.O_APPEND|os.O_CREATE, 0666)
	newFile, err := os.Open(currentFile)
	if err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
	defer newFile.Close()
	chunkInfo, err := newFile.Stat()
	if err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
	var chunkSize int64 = chunkInfo.Size()
	chunkBufferBytes := make([]byte, chunkSize)
	reader := bufio.NewReader(newFile)
	_, err = reader.Read(chunkBufferBytes)
	if err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
	n, err := file.Write(chunkBufferBytes)
	if err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
	file.Sync()            //更新磁盘
	chunkBufferBytes = nil // 重置buffer
	fmt.Println("Written ", n, " bytes")
}

/*
 Check if file exists
*/
func checkFileIsExist(filename string) bool {
	var exist = true
	if _, err := os.Stat(filename); os.IsNotExist(err) {
		exist = false
	}
	return exist
}

/*JSInputReader reads text file and generate a webpage
Plain text input file;index.html named exactly
Webpage with tagged texts
*/
func JSInputReader(OutputWordPropertyPairsName string) string {
	//read the tagged files
	ByteContent, _ := ioutil.ReadFile(OutputWordPropertyPairsName)
	StringContent := string(ByteContent)
	//add into main paragraph
	//	find <p> and </p> indexes in index.html
	ByteContentHTML, _ := ioutil.ReadFile("index.html")
	HTMLStringContent := string(ByteContentHTML)
	ParagraphStart := strings.Index(HTMLStringContent, "<p id=\"p\">") + 10
	ParagraphStop := strings.Index(HTMLStringContent, "</p>")
	//	replace string in bettween
	NewIndexHTML := HTMLStringContent[:ParagraphStart] + StringContent + HTMLStringContent[ParagraphStop:]
	//	store into file
	var f *os.File
	f, _ = os.Create("index.html") //创建文件
	io.WriteString(f, NewIndexHTML)
	defer f.Close()
	return StringContent
}
