import React,{Fragment, useEffect, useState} from 'react'
import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'
import {useAlert} from 'react-alert'
import {useDispatch,useSelector}from 'react-redux'
import { getProductDetails,clearErrors } from '../../actions/productActions'
import {Carousel , Modal, Button} from 'react-bootstrap'
import {addItemToCart} from '../../actions/cartActions'



const ProductDetails = ({ match}) => {

    const [quantity,setQuantity] = useState(1)

    const dispatch = useDispatch();
    const alert = useAlert();

    const {loading,error,product} = useSelector(state => state.productDetails)

    useEffect(()=>{
        dispatch(getProductDetails(match.params.id))

        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
    },[dispatch,alert,error,match.params.id])

    const addToCart = () => {
      dispatch(addItemToCart(match.params.id, quantity, setQuantity));
      alert.success('Items Added to Cart')
    }

    const increaseQty = () => {
       const count = document.querySelector('.count')

       if(count.valueAsNumber >=product.stocks) return;

       const qty = count.valueAsNumber + 1;
       setQuantity(qty)
    }

    const decreaseQty = () => {
      const count = document.querySelector('.count')

       if(count.valueAsNumber <= 1) return;

       const qty = count.valueAsNumber - 1;
       setQuantity(qty)
      
    }
    

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
    return (
      <Fragment>
        <MetaData title={product.name} />
        {loading ? (
          <Loader />
        ) : (
          <Fragment>
            <MetaData title={product.name} />
            <div className="row f-flex justify-content-around">
              <div className="col-12 col-lg-5 img-fluid" id="product_image">
                <Carousel pause="hover">
                  {product.images &&
                    product.images.map((image) => (
                      <Carousel.Item key={image.public_id}>
                        <img
                          className="d-block w-100"
                          src={image.url}
                          alt={product.title}
                        />
                      </Carousel.Item>
                    ))}
                </Carousel>
              </div>

              <div className="col-12 col-lg-5 mt-5">
                <h3>{product.name}</h3>
                <p id="product_id">Product # {product._id}</p>

                <hr />

                <div className="rating-outer">
                  <div
                    className="rating-inner"
                    style={{ width: `${(product.ratings / 5) * 100}%` }}
                  ></div>
                </div>
                <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>

                <hr />

                <p id="product_price">${product.price}</p>
                <div className="stockCounter d-inline">
                  <span className="btn btn-danger minus" onClick={decreaseQty}>-</span>

                  <input
                    type="number"
                    className="form-control count d-inline"
                    value={quantity}
                    readOnly
                  />

                  <span className="btn btn-primary plus" onClick={increaseQty}>+</span>
                </div>
                <button
                  type="button"
                  id="cart_btn"
                  className="btn btn-primary d-inline ml-4"
                  disabled={product.stocks === 0}
                  onClick={addToCart}
                >
                  Add to Cart
                </button>

                <hr />

                <p>
                  Status:{" "}
                  <span
                    id="stock_status"
                    className={product.stocks > 0 ? "greenColor" : "redColor"}
                  >
                    {product.stocks > 0 ? "In Stock" : "Out of Stock"}
                  </span>
                </p>

                <hr />

                <h4 className="mt-2">Description:</h4>
                <p>{product.description}</p>
                <hr />
                <p id="product_seller mb-3">
                  Sold by: <strong>{product.seller}</strong>
                </p>


                
      <Button id="cart_btn" variant="primary" onClick={handleShow}>
        Submit your review
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        className="row mt-2 mb-5 "
      >
        <Modal.Header closeButton>
          <Modal.Title>Submit Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
                            <div className="modal-body">
                            <ul className="stars">
                              <li className="star">
                                <i className="fa fa-star"></i>
                              </li>
                              <li className="star">
                                <i className="fa fa-star"></i>
                              </li>
                              <li className="star">
                                <i className="fa fa-star"></i>
                              </li>
                              <li className="star">
                                <i className="fa fa-star"></i>
                              </li>
                              <li className="star">
                                <i className="fa fa-star"></i>
                              </li>
                            </ul>

                            <textarea
                              name="review"
                              id="review"
                              className="form-control mt-3"
                            ></textarea>

                            
                          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button  className="btn my-3 float-right review-btn px-4 text-white" data-dismiss="modal"
                              aria-label="Close" id="review_btn" onClick={handleClose}>
             Submit
          </Button>
        </Modal.Footer>
      </Modal>
              </div>
            </div>
          </Fragment>
        )}
      </Fragment>
    );
}

export default ProductDetails
