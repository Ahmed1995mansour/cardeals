import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ListingItem from '../components/ListingItem';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';

const TradeInApplication = () => {
  const params = useParams();
  const { currentUser } = useSelector(state => state.user);
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: '',
    description: '',
    make: '',
    model: '',
    fuelType: '',
    year: '',
    gear: '',
    color: '',
    bodyType: '',
    millage: '',
    engineCapacity: '',
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [listingError, setListingError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [listingLoading, setListingLoading] = useState(false);
  const [listing, setListing] = useState();
  const handleImageSubmit = e => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then(urls => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch(err => {
          setImageUploadError('Image upload failed (2 mb max per image)');
          setUploading(false);
        });
    } else {
      setImageUploadError('You can only upload 6 images per listing');
      setUploading(false);
    }
  };

  const storeImage = async file => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        snapshot => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        error => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleRemoveImage = index => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1) return setError('You must upload at least one image');
      setLoading(true);
      setError(false);
      const res = await fetch('/api/trade/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          user: currentUser._id,
          listing: listing._id,
        }),
      });
      const data = await res.json();

      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      }
      navigate(`/trades`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setListingLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setListingError(true);
          setListingLoading(false);
          return;
        }
        setListing(data);
        setListingLoading(false);
        setListingError(false);
      } catch (error) {
        setListingError(true);
        setListingLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);
  return (
    <main className="p-3 max-w-6xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Request A Trade for {listing && listing.name}
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col flex-1">
          {listingError ? (
            <p>Something went wrong</p>
          ) : listingLoading ? (
            <p>Loading....</p>
          ) : (
            listing && <ListingItem listing={listing} />
          )}
        </div>
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Name"
            className="border p-3 rounded-lg"
            id="name"
            maxLength="62"
            minLength="3"
            required
            onChange={handleChange}
            value={formData.name}
          />
          <textarea
            type="text"
            placeholder="Description"
            className="border p-3 rounded-lg"
            id="description"
            required
            onChange={handleChange}
            value={formData.description}
          />

          <div className="flex gap-6 flex-wrap justify-between">
            <div className="flex w-2/5">
              <input
                type="text"
                placeholder="Make"
                className="border p-3 rounded-lg overflow-hidden"
                id="make"
                required
                onChange={handleChange}
                value={formData.make}
              />
            </div>
            <div className="flex w-2/5">
              <input
                type="text"
                placeholder="Model"
                className="border p-3 rounded-lg overflow-hidden"
                id="model"
                required
                onChange={handleChange}
                value={formData.model}
              />
            </div>
            <div className="flex w-2/5">
              <input
                type="text"
                placeholder="Fuel Type"
                className="border p-3 rounded-lg overflow-hidden"
                id="fuelType"
                required
                onChange={handleChange}
                value={formData.fuelType}
              />
            </div>
            <div className="flex w-2/5">
              <input
                type="text"
                placeholder="Transmission"
                className="border p-3 rounded-lg overflow-hidden"
                id="gear"
                required
                onChange={handleChange}
                value={formData.gear}
              />
            </div>
            <div className="flex w-2/5">
              <input
                type="text"
                placeholder="Color"
                className="border p-3 rounded-lg overflow-hidden"
                id="color"
                required
                onChange={handleChange}
                value={formData.color}
              />
            </div>
            <div className="flex w-2/5">
              <input
                type="text"
                placeholder="Body Type"
                className="border p-3 rounded-lg overflow-hidden"
                id="bodyType"
                required
                onChange={handleChange}
                value={formData.bodyType}
              />
            </div>
            <div className="flex w-2/5">
              <input
                type="number"
                placeholder="Millage"
                className="border p-3 rounded-lg overflow-hidden"
                id="millage"
                required
                onChange={handleChange}
                value={formData.millage}
              />
            </div>
            <div className="flex w-2/5">
              <input
                type="number"
                placeholder="Engine Capacity"
                className="border p-3 rounded-lg overflow-hidden"
                id="engineCapacity"
                required
                onChange={handleChange}
                value={formData.engineCapacity}
              />
            </div>
            <div className="flex w-2/5">
              <input
                type="number"
                placeholder="Year"
                className="border p-3 rounded-lg overflow-hidden"
                id="year"
                required
                onChange={handleChange}
                value={formData.year}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">
            Images:
            <span className="font-normal text-gray-600 ml-2">
              The first image will be the cover (max 6)
            </span>
          </p>
          <div className="flex gap-4">
            <input
              onChange={e => setFiles(e.target.files)}
              className="p-3 border border-gray-300 rounded w-full"
              type="file"
              id="images"
              accept="image/*"
              multiple
            />
            <button
              type="button"
              disabled={uploading}
              onClick={handleImageSubmit}
              className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80"
            >
              {uploading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
          <p className="text-red-700 text-sm">{imageUploadError && imageUploadError}</p>
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div key={url} className="flex justify-between p-3 border items-center">
                <img
                  src={url}
                  alt="listing image"
                  className="w-20 h-20 object-contain rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="p-3 text-red-700 rounded-lg uppercase hover:opacity-75"
                >
                  Delete
                </button>
              </div>
            ))}
          <button
            disabled={loading || uploading}
            className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
          >
            {loading ? 'Applying...' : 'Request Trade'}
          </button>
          {error && <p className="text-red-700 text-sm">{error}</p>}
        </div>
      </form>
    </main>
  );
};

export default TradeInApplication;
