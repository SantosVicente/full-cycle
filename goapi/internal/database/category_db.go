package database

import (
	"database/sql"

	"github.com/SantosVicente/full-cycle/goapi/internal/entity"
)

type CategoryDB struct {
	db *sql.DB
}

func NewCategoryDB(db *sql.DB) *CategoryDB {
	return &CategoryDB{db: db}
}

//func (cd *CategoryDB) METHOD declaration
func (cd *CategoryDB) GetCategories() ([]*entity.Category, error) {
	rows, err := cd.db.Query("SELECT id, name FROM categories")
	if err != nil {
		return nil, err
	}
	//comando para fechar somente depois que terminar de executar tudo
	defer rows.Close()
	
	var categories []*entity.Category
	for rows.Next() {
		var category entity.Category
		//quando ele for scanear os dados, caso tenha algum erro, ele retorna o erro
		if err := rows.Scan(&category.ID, &category.Name); err != nil {
			return nil, err //retorna o erro caso tenha, e retorna a lista de categorias vazia
		}
		categories = append(categories, &category)
	}
	return categories, nil //retorna a lista de categorias e o erro nulo
}

func (cd *CategoryDB) GetCategory(id string) (*entity.Category, error) {
	var category entity.Category
	//QueryRow retorna apenas uma linha
	//ele passa os valores para o category por referencia de ponteiro
	err := cd.db.QueryRow("SELECT id, name FROM categories WHERE id = ?", id).Scan(&category.ID, &category.Name)
	if err != nil {
		return nil, err
	}
	return &category, nil
}

func (cd *CategoryDB) CreateCategory(category *entity.Category) (string, error) {
	_, err := cd.db.Exec("INSERT INTO categories (id, name) VALUES (?, ?)", category.ID, category.Name)
	if err != nil {
		return "", err
	}
	return category.ID, nil
}
