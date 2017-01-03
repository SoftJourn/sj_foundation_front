import React, { Component } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';

export default class CategoriesFilter extends Component {

  constructor(props) {
    super();
    this.state = {
      categories: props.categories,
      selectedCategory: props.selectedCategory,
    };
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      categories: newProps.categories,
      selectedCategory: newProps.selectedCategory,
    });
  }

  render() {
    const { categories, selectedCategory } = this.state;
    const allButtonClass = classNames('btn btn-link', { active: '' === selectedCategory});
    return(
      <div className="col-xs-12 category-filter">
        <Link to="/" className={allButtonClass} key="all">All</Link>
        {categories.map(category => {
          if (category.slug === 'uncategorized' || category.count == 0) {
            return null
          }
          const buttonClass = classNames('btn btn-link', { active: category.id == selectedCategory});
          return (
            <Link to={`/c/${category.id}`} className={buttonClass} key={category.id}>{category.name}</Link>
          );
        })}
      </div>
    );
  }
}