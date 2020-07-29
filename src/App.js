import React, { useState, useReducer } from 'react';
import './App.css';


const validationNames = [
  { id: 'lowercase', name: 'Lower-case' },
  { id: 'uppercase', name: 'Upper-case' },
  { id: 'number', name: 'Number' },
  { id: 'minChar', name: 'More than 8 characters' },
  {id: 'specialChar', name:'Special Character'}
];

const validationObj = {
  lowercase: false,
  uppercase: false,
  number: false,
  minChar: false,
  specialChar: false
};

const validationReducer = (state, action) => {
  switch (action.type) {
    case 'lowercase':
      return { ...state, lowercase: action.payload };
    case 'uppercase':
      return { ...state, uppercase: action.payload };
    case 'number':
      return { ...state, number: action.payload };
    case 'minChar':
      return { ...state, minChar: action.payload };
    case 'specialChar':
      return { ...state, specialChar: action.payload };
    default:
      return state;
  }
};

function App() {
  const [isLocked, setIsLocked] = useState(false);
  const [state, dispatch] = useReducer(validationReducer, validationObj);

  const handleChange = (e) => {
    const validatePass = validate(e.target.value.trim());
    setIsLocked(validatePass);
  };

  const validate = (value) => {
    const checkLength = value.length >= 8;
    const checkLowerCase = /[a-z|ç|ş|ö|ü|ı|ğ]/u.test(value);
    const checkUpperCase = /[A-Z|Ç|Ş|Ö|Ü|İ|Ğ]/u.test(value);
    const checkNumber = /[0-9]/.test(value);
    const checkSplChar = /[\\@\\.]/.test(value);

    if (checkLength) {
      dispatch({ type: 'minChar', payload: true });
    } else {
      dispatch({ type: 'minChar', payload: false });
    }

    if (checkSplChar) {
      dispatch({ type: 'specialChar', payload: true });
    } else {
      dispatch({ type: 'specialChar', payload: false });
    }


    if (checkLowerCase) {
      dispatch({ type: 'lowercase', payload: true });
    } else {
      dispatch({ type: 'lowercase', payload: false });
    }

    if (checkUpperCase) {
      dispatch({ type: 'uppercase', payload: true });
    } else {
      dispatch({ type: 'uppercase', payload: false });
    }

    if (checkNumber) {
      dispatch({ type: 'number', payload: true });
    } else {
      dispatch({ type: 'number', payload: false });
    }

    const isAllGood =
      checkLength && checkUpperCase && checkLowerCase && checkNumber && checkSplChar;

    return isAllGood;
  };

  // useEffect(() => {
  //   if (isLocked) {
  //     const timeout = setTimeout(() => {
  //       setLock(lockIcon.closed);
  //     }, 700);
  //     return () => clearTimeout(timeout);
  //   } else {
  //     setLock(lockIcon.open);
  //   }
  // }, [isLocked]);

  return (
    <div className="App" >
      <div className="form-box">
        <ValidationItems state={state} />
        <FormField
          // lock={lock}
          handleChange={handleChange}
          isLocked={isLocked}
        />
      </div>
    </div>
  );
}

const ValidationIcon = ({ isDone }) => {
  return isDone ? (
    <svg width="14" height="12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polyline
        className="check"
        points="1,7 5,11 13,1"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="2px"
        strokeLinecap="round"
      />
    </svg>
  ) : (
    <svg width="12" height="12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 6A6 6 0 110 6a6 6 0 0112 0z" fill="#5B9A78" />
    </svg>
  );
};

const ValidationItems = ({ state }) => (
  <ul className="validation-box">
    {validationNames.map((item) => (
      <li
        className={
          state[item.id] === true ? `done validation-item` : 'validation-item'
        }
        key={item.id}>
        <span className="validation-icon">
          <ValidationIcon isDone={state[item.id]} />
        </span>
        {item.name}
      </li>
    ))}
  </ul>
);

const FormField = ({ lock, handleChange, isLocked }) => {
  return (
    <div className="form-field">
      <input
        className="form-input"
        id="password"
        type="password"
        onChange={handleChange}
      />
      <label className="form-label" htmlFor="password">
        Password
      </label>
    </div>
  );
};

export default App;
