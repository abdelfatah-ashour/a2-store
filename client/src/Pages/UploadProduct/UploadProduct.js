import React, { useState } from 'react';
import './UploadProduct.css';
import FieldInput from './FieldInput/FieldInput';
import FieldOption from './FieldOption/FieldOption';
import API from '../../utils/utils';
import { toast } from 'react-toastify';

function UploadProduct() {
    const company = [
        'samsung',
        'apple',
        'oppo',
        'huawei',
        'google',
        'redmi',
        'honer',
    ];
    const category = ['mobile', 'clothes'];
    const [Product, setProduct] = useState({
        name: '',
        title: '',
        company: '',
        price: '',
        category: '',
        quantity: 1,
        description: '',
    });
    const [File, setFile] = useState(null);

    const handleFields = e => {
        setProduct({
            ...Product,
            [e.target.name]: e.target.value,
        });
    };

    const handleFile = e => {
        const file = e.target.files[0];
        setFile(file);
    };

    const handleOnSubmit = async e => {
        e.preventDefault();
        let data = new FormData();
        data.append('photo', File);
        data.append('name', Product.name);
        data.append('title', Product.title);
        data.append('price', Product.price);
        data.append('company', Product.company);
        data.append('description', Product.description);
        data.append('quantity', Product.quantity);
        data.append('category', Product.category);

        await API.post('/api/product/create', data)
            .then(({ data }) => toast.success(data.message))
            .catch(({ response }) => toast.warning(response.data.message));
    };

    return (
        <div className=" uploader">
            <h5> upload new product </h5>

            <div className="row">
                <div className="contentImage col-lg-6 col-sm-12">
                    <img src="/images/upload.png" alt="" />
                </div>
                <form
                    className="col-lg-6 col-sm-12"
                    encType="multipart/form-data">
                    <FieldInput
                        name="name"
                        type="text"
                        onChange={handleFields}
                    />
                    <FieldInput
                        name="title"
                        type="text"
                        onChange={handleFields}
                    />
                    <FieldInput
                        name="price"
                        type="number"
                        onChange={handleFields}
                    />
                    <div className="form-group">
                        <label htmlFor="description">description</label>
                        <textarea
                            className="form-control"
                            id="description"
                            rows="3"
                            name="description"
                            onChange={handleFields}></textarea>
                    </div>
                    <FieldOption
                        option={company}
                        name="company"
                        onChange={handleFields}
                    />
                    <FieldOption
                        option={category}
                        name="category"
                        onChange={handleFields}
                    />
                    <FieldInput
                        name="quantity"
                        type="number"
                        onChange={handleFields}
                    />
                    <FieldInput
                        name="photo"
                        type="file"
                        onChange={handleFile}
                    />
                    <button
                        className="btn btn-dark onSubmit"
                        onClick={handleOnSubmit}>
                        upload
                    </button>
                </form>
            </div>
        </div>
    );
}

export default UploadProduct;
