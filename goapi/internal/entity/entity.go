package entity

import "github.com/google/uuid"

type Category struct {
	ID   string
	Name string
}

func NewCategory(name string) *Category {
	return &Category{
		ID:   uuid.New().String(),
		Name: name,
	}
}

type Product struct {
	ID       			string
	Name     			string
	Description		string
	Price    			float64
	CategoryID 		string
	ImageURL 			string
}

// o motivo  de passar string somente em description e imageURL é que
// os que não tem tipagem herdam deles. Sendo assim, name também é string,
// assim como o categoryID também é string.
func NewProduct(name, description string, price float64, categoryID, imageURL string) *Product {
	return &Product{
		ID:          uuid.New().String(),
		Name:        name,
		Description: description,
		Price:       price,
		CategoryID:  categoryID,
		ImageURL:    imageURL,
	}
}
