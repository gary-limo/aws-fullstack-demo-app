import React, { Component } from "react";
import { CategoryNavBar } from "../categoryNavBar/CategoryNavBar";
import { SearchBar } from "../../search/searchBar/SearchBar";
import { BestSellersBar } from "../../bestSellers/bestSellersBar/BestSellersBar";
import { CategoryGallery } from "../CategoryGallery";
import cooks from "../../../images/hero/hero-cookbooks.png";

export default class Snowflake extends Component {
  render() {
    return (
      <div className="Category">
        <SearchBar />
        <CategoryNavBar />
        <BestSellersBar />
        <img src={cooks} alt="Cookbooks hero" className="img-fluid full-width top-hero-padding" />
        <CategoryGallery match={{ params: { id: 'cookbooks' }}} />
      </div>
    );
  }
}