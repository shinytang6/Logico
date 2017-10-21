package routers

import (
	"bMatch/controllers"
	"github.com/astaxie/beego"
)

func init() {
	beego.Router("/", &controllers.MainController{})
	beego.Router("/event/create", &controllers.FileController{}, "get:CreateEvent")
}
