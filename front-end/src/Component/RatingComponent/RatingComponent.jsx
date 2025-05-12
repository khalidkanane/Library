import React, { useState, useEffect } from 'react';
import Rating from '@mui/material/Rating';
import axios from 'axios';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const RatingComponent = ({ bookId }) => {

    console.log(bookId)



  const session = useSelector(state => state.session);
  const [value, setValue] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [count,setCount]=useState(false)



  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/ratings/${bookId}`)
      .then(response => {
        setAverageRating(response.data.rating);
        setValue(response.data.rating)
      })
      .catch(error => console.error('Error fetching rating:', error));
  }, [bookId,count]);










  const handleRating = (event, newValue) => {
    setValue(newValue);

    const formData = new FormData();
    formData.append('book_id', bookId);
    formData.append('rating', newValue);

    axios.post('http://127.0.0.1:8000/api/ratings', formData, {
      headers: {
        'Authorization': `Bearer ${session.token}`,
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(response => {

      console.log('Rating submitted:', response.data);

      if(response.status==401){
        
        return
      }
      toast.success('Good Job!', {
        icon: '👏',
      })
      setCount(!count)


    })
    .catch(error => {
      console.error('Error submitting rating:', error)
      toast.error("you can't add Rating")
    
    
    });
  };

  return (
    <div>
      <h3>Average Rating: {averageRating}</h3>
      <Rating
        name="book-rating"
        value={value}
        onChange={handleRating}
      />
    </div>
  );
};

export default RatingComponent;
