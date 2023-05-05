import { useState } from "react";
import { Article } from "../types/article";
import { Button } from "./Button";

type ArticleFormProps = {
    onSubmit: (body: Article) => void;
}


export const ArticleForm = () => {
const [title, setTitle] = useState("");
const [description, setDescription] = useState("");
const [category, setCategory] = useState("");

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            const body = {
                title,
                description,
                category
        }}}>
            <label htmlFor="article-title">Add article</label>
            <input 
            type="text" 
            id="article-title"
            value={title}
            onChange={(e) => {
                setTitle(e.target.value);
            }}
            />

            <label htmlFor="article-description">Article Description</label>
            <textarea 
            id="article-description"
            value={description}
            onChange={(e) => {
                setDescription(e.target.value);
            }}
            />

            <label htmlFor="article-category">Article category</label>
            <select 
            id="article-category"
            value={category}
            onChange={(e) => {
                setCategory(e.target.value);
            }}
            >

                <option value="Category 1">Category 1</option>
                <option value="Category 2">Category 2</option>
                <option value="Category 3">Category 3</option>
                <option value="Category 4">Category 4</option>
            </select>

            <Button type="submit">Save</Button>
        </form>
    );
};