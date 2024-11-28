import React, { Component } from "react";
import { CategoryNavBar } from "../categoryNavBar/CategoryNavBar";
import { Gap } from "../categoryNavBar/Gap";
import { SearchBar } from "../../search/searchBar/SearchBar";
import { Sidebar } from "../sidebar/Sidebar";
import { Installation } from '../components/Installation';

 
 



export default class Snowflake extends Component {
  private sidebarSections = [
    {
      title: "Categories",
      items: [
        { id: "installation", title: "Installation" },
        { id: "creating-site", title: "Creating your site" },
        { id: "publishing", title: "Publishing your site" },
        { id: "customization", title: "Customization" },
        { id: "conventions", title: "Conventions" },
        { id: "browser-support", title: "Browser support" },
        { id: "enterprise-feedback", title: "Enterprise feedback" },
        { id: "philosophy", title: "Philosophy" },
        { id: "alternatives", title: "Alternatives" },
        { id: "license", title: "License" },
        { id: "blogs", title: "Blogs" },
        { id: "social-cards", title: "Social cards" },
        { id: "changelog", title: "Changelog" },
        { id: "how-to-upgrade", title: "How to upgrade" }
      ]
    }
  ];

  handleItemClick = (itemId: string) => {
    // Handle item click
    console.log(`Clicked item: ${itemId}`);
  };

  render() {
    return (
      <div className="Category">
        <SearchBar />
        <CategoryNavBar />
        <Gap />
        <div className="ContentArea">
          <div className="sidebar-container">
            <Sidebar 
              sections={this.sidebarSections} 
              onItemClick={this.handleItemClick}
            />
          </div>
          <div className="MainContent">
            <Installation />
          </div>
        </div>
      </div>
    );
  }
}
