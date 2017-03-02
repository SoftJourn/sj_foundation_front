import React, { Component } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';
import CategoryFilterDropdown from './CategoryFilterDropdown';

export default class CategoriesFilter extends Component {

  constructor(props) {
    super();
    this.state = {
      categories: props.categories,
      selectedCategory: props.selectedCategory,
      moreCategories: []
    };
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      categories: newProps.categories,
      selectedCategory: newProps.selectedCategory,
    });
  }

  componentDidUpdate() {
    const filterElement = document.getElementsByClassName("category-filter");
    if (filterElement.length > 0) {
      let width = filterElement[0].offsetWidth;
      let parentWidth = filterElement[0].offsetParent.offsetWidth;
      let categories = this.state.categories;

      if((parentWidth - width - 80) < 0 && categories.length > 1) {
        const lastCategory = categories.slice(-1).pop();
        let moreCategories = this.state.moreCategories;
        categories.pop();
        moreCategories.push(lastCategory);
        this.setState({categories, moreCategories});
      }
    }
  }

  render() {
    const { categories, selectedCategory, moreCategories } = this.state;
    const allButtonClass = classNames('btn btn-link', { active: '' === selectedCategory});
    return(
      <div className="category-filter">
        <Link to="/" className={allButtonClass} key="all">All</Link>
        {categories.map(category => {
          if (category.slug === 'uncategorized' || category.count == 0) {
            return null
          }
          const buttonClass = classNames('btn btn-link', { active: encodeURI(category.slug) == selectedCategory});
          return (
            <Link to={`/category/${category.slug}`} className={buttonClass} key={category.id}>{category.name}</Link>
          );
        })}
        <CategoryFilterDropdown
          items={moreCategories}
          selectedCategory={selectedCategory}
        />
      </div>
    );
  }
}