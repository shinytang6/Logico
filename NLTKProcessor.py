import nltk
InputFile=open('./InputTextForWordProcessor.txt','r')
text=InputFile.read()
tokenizedText = nltk.word_tokenize(text)
pairedText = nltk.pos_tag(tokenizedText)
OutputFile=open('./OutputWordPropertyPairs.txt','w')
OutputFile.write(str(pairedText))
