import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import { Link } from 'react-router-dom'

const CategoryList = () => {
    const [categoryProduct,setCategoryProduct] = useState([])
    const [loading,setLoading] = useState(false)

    const categoryLoading = new Array(13).fill(null)

    const fetchCategoryProduct = async() =>{
        setLoading(true)
        const response = await fetch(SummaryApi.categoryProduct.url)
        const dataResponse = await response.json()
        setLoading(false)
        setCategoryProduct(dataResponse.data)
    }

    useEffect(()=>{
        fetchCategoryProduct()
    },[])

  return (
    <div className='container p-4 mx-auto'>
           <div className='flex items-center justify-between gap-4 overflow-scroll scrollbar-none'>
            {

                loading ? (
                    categoryLoading.map((el,index)=>{
                            return(
                                <div className='w-16 h-16 overflow-hidden rounded-full md:w-20 md:h-20 bg-slate-200 animate-pulse' key={"categoryLoading"+index}>
                                </div>
                            )
                    })  
                ) :
                (
                    categoryProduct.map((product,index)=>{
                        return(
                            <Link to={"/product-category?category="+product?.category} className='cursor-pointer' key={product?.category}>
                                <div className='flex items-center justify-center w-16 h-16 p-4 overflow-hidden rounded-full md:w-20 md:h-20 bg-slate-200'>
                                    <img src={product?.productImage[0]} alt={product?.category} className='object-scale-down h-full transition-all mix-blend-multiply hover:scale-125'/>
                                </div>
                                <p className='text-sm text-center capitalize md:text-base'>{product?.category}</p>
                            </Link>
                        )
                    })
                )
            }
           </div>
    </div>
  )
}

export default CategoryList