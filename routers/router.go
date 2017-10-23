package routers

import (
	"Logico/controllers"
	"github.com/astaxie/beego"
)

func init() {
	beego.Router("/", &controllers.MainController{})
	beego.Router("/event/sentence", &controllers.FileController{}, "get:CreateSentence")
	beego.Router("/event/file", &controllers.FileController{}, "*:CreateFile")
}
