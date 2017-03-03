import React, {PropTypes} from 'react';
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
                <div className="footer_dv">
                    {chunk.map((category, categoryIndex) => {
                        return (
                            <p key={categoryIndex}>
                                <a style={ {color: "inherit"} } href={category.link}>{category.name}</a>
                            </p>)
                    })}
                </div>
            </div>
        )
    }


  render() {
        const categoriesInChunks = _chunk(this.state.categories, 5);
        return (
          <div>
              <section className="footer-bottom" style={{backgroundColor: "lightgray"}}>
                  <div className="container">
                      <div className="row">
                          <div className="col-lg-9 col-md-9 col-sm-9">
                              <div style={{"paddingBottom":"10px"}}>
                                  <h4>Discover</h4>
                              </div>
                              {categoriesInChunks.map((chunk, chunkIndex) => {
                                  return this.displayChunkInList(chunk, chunkIndex)
                              })}
                          </div>
                          <div className="col-lg-3 col-md-3 col-sm-3">
                              <div style={{"paddingBottom":"10px"}}><h4>About</h4></div>
                              <div className="col-lg-12  col-md-12 col-sm-12">
                                  <div className="footer_dv">
                                      <p><a style={ {color: "inherit"} } href="/how-it-works">How it works</a></p>
                                      <p><a style={ {color: "inherit"} } href="http://www.softjourn.com">Softjourn</a></p>
                                  </div>
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