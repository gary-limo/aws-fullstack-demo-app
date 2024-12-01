import React, { Component } from "react";
import { CategoryNavBar } from "../categoryNavBar/CategoryNavBar";
import { Gap } from "../categoryNavBar/Gap";
import { SearchBar } from "../../search/searchBar/SearchBar";
import { Sidebar } from "../sidebar/Sidebar";
import { PRreview } from '../components/PRreview';
import { QAValidation } from '../components/QAValidation';

export default class Snowflake extends Component {
  state = {
    selectedItem: 'PR-review'  // Default selected item
  };

  private sidebarSections = [
    {
      title: "Categories",
      items: [
        { id: "PR-review", title: "PR Review" },
        { id: "qa-validation", title: "QA Validation"},
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
    this.setState({ selectedItem: itemId });
  };

  renderContent() {
    switch (this.state.selectedItem) {
      case 'PR-review':
        return <PRreview />;
      case 'qa-validation':
        return <QAValidation />;
      default:
        return <div>Select a category</div>;
    }
  }

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
            {this.renderContent()}
          </div>
        </div>
      </div>
    );
  }
}
