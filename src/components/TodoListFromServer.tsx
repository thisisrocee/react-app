import { useEffect, useState } from "react";
import { Button } from "./Button";
import axios from "axios";
import "../styles/apiStyle.scss";
import { TodoItem } from "./TodoItem";
import React from "react";
import { delay } from "../helpers/delay";





const API_URL = "http://localhost:3004/articles";

export const TodoListFromServer = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState(1);
  const [id, setId] = useState(0);
  const [isEdit, setIsEdit] = useState(false);
  const [newArticleValue, setNewArticleValue] = useState("");
  const [newDesValue, setNewDesValue] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        await delay(1000);

        const { data } = await axios.get(API_URL);

        setArticles(data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const addArticle = async () => {
    const newArticle = {
      title: `New article ${count}`,
      description: `New description ${count}`,
    };

    try {
      setIsLoading(true);
      await delay(1000);

      const { data } = await axios.post(API_URL, newArticle);
      console.log(data);


      setArticles([...articles, data]);
      setIsLoading(false);
      setCount(count + 1);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const deleteArticle = async () => {
    try {
      setIsLoading(true);
      await delay(1000);
      const data = await axios.delete(`${API_URL}/${id}`);
      console.log(data)

      const filteredArticles = articles.filter((article) => article.id !== id);
      setArticles(filteredArticles);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const updateArticle = async () => {
    try {
      setIsLoading(true);
      await delay(1000);
      await axios.put(`${API_URL}/${id}`, {
        title: `New article ${100}`,
        description: `New description ${100}`,
      });
      setArticles(articles);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <Button onButtonClick={addArticle}>Add article</Button>

      <input
        type="text"
        placeholder="enter id..."
        onChange={(e) => {
          setId(Number(e.target.value));
        }}
      />
      <Button onButtonClick={deleteArticle}>Delete article</Button>

      <h1>All Articles</h1>

      <Button
        variant={isEdit ? "primary" : "secondary"}
        onButtonClick={() => {
          setIsEdit(!isEdit);
        }}
      >
        {isEdit ? "Cancel" : "Edit"}
      </Button>

      {articles.length > 0
        ? articles.map((article) => {
            return (
              <React.Fragment key={article.id}>
                {isEdit ? (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      articles.map((article) => {
                        if (article.id === id) {
                          article.title = newArticleValue;
                          article.description = newDesValue;
                        }
                      });
                      setId(article.id);
                      setIsEdit(false);
                    }}
                  >
                    <div key={article.id}>
                      <input
                        type="text"
                        value={article.title}
                        onChange={(e) => {
                          setNewArticleValue(e.target.value);
                        }}
                      />
                      <input
                        type="text"
                        value={article.description}
                        onChange={(e) => {
                          setNewDesValue(e.target.value);
                        }}
                      />
                    </div>
                  </form>
                ) : (
                  <>
                    {/* <p>id: {article.id}</p> */}
                    <h3 className="item-title">
                      {article.id} {article.title}
                    </h3>
                  </>
                )}
              </React.Fragment>
            );
          })
        : null}
    </div>
  );
};
