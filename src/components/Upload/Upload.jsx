import axios from 'axios';
import { useState } from 'react'
import { ColorRing } from 'react-loader-spinner';

const Upload = () => {
    const [img, setImg] = useState(null);
    const [loading, setLoading] = useState(false);

    const uploadFile = async () => {
        const data = new FormData();
        data.append('file', img);
        data.append('upload_preset', 'images_preset');

        try {
            let cloudName = process.env.CLOUD_NAME;
            let api = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
            
            const res = await axios.post(api, data);
            const { secure_url } = res.data;
            return secure_url;
        } catch (error) {
            console.error(error);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const imgUrl = await uploadFile('image');
            // await axios.post(`${process.env.DATABASE_URL}/api/images`, {imgUrl})
            setImg(null);
            console.log("File upload success!");
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }    
    }



    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="img">Image:</label>
                    <br />
                    <input
                        type="file"
                        accept="image/*"
                        id="img"
                        onChange={(e) => setImg((prev) => e.target.files[0])}
                    />
                </div>
                <br />
                <button type="submit">Upload</button>
            </form>

            {loading && (
                <ColorRing
                    visible={true}
                    height={80}
                    width={80}
                    ariaLabel="blocks-loading"
                    wrapperStyle={{}}
                    wrapperClass="blocks-wrapper"
                    colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                />
            )}
        </div>
    );
}

export default Upload;
