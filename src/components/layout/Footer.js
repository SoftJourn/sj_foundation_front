import React, {PropTypes} from 'react';
import { Link } from 'react-router'
import _chunk from 'lodash/chunk';


class Footer extends React.Component {

    constructor(props) {
        super();
        this.state = {
            categories: props.categories
        };
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            categories: newProps.categories
        });
    }

    displayChunkInList(chunk, chunkIndex) {
        return  (
            <div className="col-lg-3 col-md-3 col-sm-3" key={chunkIndex}>
                {chunk.map((category, categoryIndex) => {
                    return (
                        <p key={categoryIndex}>
                            <Link className="footer-link" to={{ pathname:"search", query: {category: category.slug}}}>
                                {category.name}
                            </Link>
                        </p>
                    )
                })}
            </div>
        )
    }


    render() {
        const categoriesInChunks = _chunk(this.state.categories, 5);
        return (
            <div>
                <section className="footer-bottom">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-9 col-md-9 col-sm-9">
                                <div className="footer-header">
                                    <h4>Discover</h4>
                                </div>
                                {categoriesInChunks.map((chunk, chunkIndex) => {
                                    return this.displayChunkInList(chunk, chunkIndex)
                                })}
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-3">
                                <div className="footer-header">
                                    <h4>About</h4>
                                </div>
                                <div className="col-lg-12 col-md-12 col-sm-12">
                                    <p>
                                        <Link className="footer-link" to="/how-it-works">
                                            How it works
                                        </Link>
                                    </p>
                                    <p>
                                        <Link className="footer-link" to="http://www.softjourn.com">
                                            Softjourn
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

Footer.propTypes = {};

Footer.defaultProps = {};

export default Footer;