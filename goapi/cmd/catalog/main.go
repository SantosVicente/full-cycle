package main

import (
	"database/sql"
	"fmt"
	"net/http"

	"github.com/SantosVicente/full-cycle/goapi/internal/database"
	"github.com/SantosVicente/full-cycle/goapi/internal/service"
	"github.com/SantosVicente/full-cycle/goapi/internal/webserver"
	"github.com/go-chi/chi/middleware"
	"github.com/go-chi/chi/v5"
	_ "github.com/go-sql-driver/mysql"
)

//o _ é para não dar erro de importação, pois o driver não é usado diretamente

func main() {
	db, err := sql.Open("mysql","root:root@tcp(localhost:3306)/fullcycle")
	if err != nil {
		panic(err.Error())
	}
	defer db.Close()

	categoryDB := database.NewCategoryDB(db)
	categoryService := service.NewCategoryService(*categoryDB)

	productDB := database.NewProductDB(db)
	productService := service.NewProductService(*productDB)

	webCategoryHandler := webserver.NewWebCategoryHandler(categoryService)
	webProductHandler := webserver.NewWebProductHandler(productService)

	c := chi.NewRouter()
	c.Use(middleware.Logger)
	c.Use(middleware.Recoverer)
	c.Get("/category/{id}", webCategoryHandler.GetCategory)
	c.Get("/category", webCategoryHandler.GetCategories)
	c.Post("/category", webCategoryHandler.CreateCategory)

	c.Get("/product/{id}", webProductHandler.GetProduct)
	c.Get("/product", webProductHandler.GetProducts)
	c.Get("/product/category/{categoryID}", webProductHandler.GetProductsByCategoryID)
	c.Post("/product", webProductHandler.CreateProduct)

	fmt.Println("🚀 Server is running at port 8080.")
	http.ListenAndServe(":8080", c)
}