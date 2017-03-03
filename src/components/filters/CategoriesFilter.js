import React, { Component } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';
import CategoryFilterDropdown from './CategoryFilterDropdown';

export default class CategoriesFilter extends Component {

  constructor(props) {
    super();
    this.state = {
      defaultCategories: props.categories,
      categories: props.categories,
      query: props.query,
      selectedCategory: props.selectedCategory,
      moreCategories: [],
      displayedCategories: []
    };
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      defaultCategories: newProps.categories,
      categories: newProps.categories,
      query: newProps.query,
      selectedCategory: newProps.selectedCategory,
    });
  }

  componentDidMount() {
    window.addEventListener("resize", this.onResize.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.onResize.bind(this));
  }

  componentDidUpdate() {
    this.updateMenuWidth();
  }

  onResize() {
    const defaultCategories = this.state.defaultCategories;
    this.setState(
      {categories: defaultCategories},
      this.updateMenuWidth(),
    );
  }

  updateMenuWidth() {
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
        this.setState({categories, displayedCategories: categories, moreCategories});
      }
    }
  }

  render() {
    const { categories, selectedCategory, moreCategories, query } = this.state;
    const allButtonClass = classNames('btn btn-link', { active: '' === query.category });
    return(
      <div className="category-filter">
        <Link to={{pathname: '/search', query: {...query, category: ''} }} className={allButtonClass} key="all">All</Link>
        {categories.map(category => {
          if (category.slug === 'uncategorized' || category.count == 0) {
            return null
          }
          const buttonClass = classNames('btn btn-link', { active: encodeURI(category.slug) == query.category});
          return (
            <Link to={{pathname: '/search', query: {...query, category: category.slug} }} className={buttonClass} key={category.id}>{category.name}</Link>
          );
        })}
        <CategoryFilterDropdown
          items={moreCategories}
          selectedCategory={selectedCategory}
          query={query}
        />
      </div>
    );
  }
}