import React,{Fragment, useEffect} from 'react'
import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'
import {useAlert} from 'react-alert'
import {useDispatch,useSelector}from 'react-redux'
import { getProductDetails,clearErrors } from '../../actions/productActions'

const ProductDetails = ({ match}) => {

    const disptach = useDispatch();
    const alert = useAlert();

    const {loading,error,product} = useSelector(state => state.productDetails)

    useEffect(()=>{
        disptach(getProductDetails(match.params.id))

        if(error){
            alert.error(error);
            disptach(clearErrors());
        }
    },[disptach,alert,error,match.params.id])
    return (
         <Fragment>
        {loading ? <Loader/> :(
            <Fragment>
            <div className="row f-flex justify-content-around">
            <div className="col-12 col-lg-5 img-fluid" id="product_image">
                <img src="https://i5.walmartimages.com/asr/1223a935-2a61-480a-95a1-21904ff8986c_1.17fa3d7870e3d9b1248da7b1144787f5.jpeg?odnWidth=undefined&odnHeight=undefined&odnBg=ffffff" alt="sdf" height="500" width="500"/>
            </div>

            <div className="col-12 col-lg-5 mt-5">
                <h3>{product.name}</h3>
                <p id="product_id">Product # sklfjdk35fsdf5090</p>

                <hr/>

                <div className="rating-outer">
                    <div className="rating-inner"></div>
                </div>
                <span id="no_of_reviews">(5 Reviews)</span>

                <hr/>

                <p id="product_price">$108.00</p>
                <div className="stockCounter d-inline">
                    <span className="btn btn-danger minus">-</span>

                    <input type="number" className="form-control count d-inline" value="1" readOnly />

                    <span className="btn btn-primary plus">+</span>
                </div>
                 <button type="button" id="cart_btn" className="btn btn-primary d-inline ml-4">Add to Cart</button>

                <hr/>

                <p>Status: <span id="stock_status">In Stock</span></p>

                <hr/>

                <h4 className="mt-2">Description:</h4>
                <p>Binge on movies and TV episodes, news, sports, music and more! We insisted on 720p High Definition for this 32" LED TV, bringing out more lifelike color, texture and detail. We also partnered with Roku to bring you the best possible content with thousands of channels to choose from, conveniently presented thr/ough your own custom home screen.</p>
                <hr/>
                <p id="product_seller mb-3">Sold by: <strong>E-Mart</strong></p>
				
				<button id="review_btn" type="button" className="btn btn-primary mt-4" data-toggle="modal" data-target="#ratingModal">Submit Your Review</button>
				
				<div className="row mt-2 mb-5">
                    <div className="rating w-50">

                        <div className="modal fade" id="ratingModal" tabIndex="-1" role="dialog" aria-labelledby="ratingModalLabel" aria-hidden="true">
                            
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="ratingModalLabel">Submit Review</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">

                                        <ul className="stars" >
                                            <li className="star"><i className="fa fa-star"></i></li>
                                            <li className="star"><i className="fa fa-star"></i></li>
                                            <li className="star"><i className="fa fa-star"></i></li>
                                            <li className="star"><i className="fa fa-star"></i></li>
                                            <li className="star"><i className="fa fa-star"></i></li>
                                        </ul>

                                        <textarea name="review" id="review" className="form-control mt-3">

                                        </textarea>

                                        <button className="btn my-3 float-right review-btn px-4 text-white" data-dismiss="modal" aria-label="Close">Submit</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
				</div>		
            </div>
        </div>
       </Fragment>
        )}
    </Fragment>
        
    

    )
}

export default ProductDetails
