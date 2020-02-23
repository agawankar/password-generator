import React, {useRef, useState} from 'react';
import { 
  Container, 
  Row, 
  Button, 
  Alert, 
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  Input,
  Form, 
  FormGroup, 
  Label,
  ButtonGroup,
  Spinner
 } from 'reactstrap';
import './App.css';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [isGenerated, setIsGenerated] = useState(false);
  const [password, setPassword] = useState('')
  const [isPrimarySpinner, setIsPrimarySpinner] = useState(false);
  const [isSecondarySpinner, setIsSecondarySpinner] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [rSelected, setRSelected] = useState(1);
  const [successMessage, setSuccessMessage] = useState(false);
  const [successMessageData, setSuccessMessageData] = useState('')
  const [errorMessage, setErrorMessage] = useState(false);
  const [errorMessageData, setErrorMessageData] = useState('')
  const [copySuccessSpinner, setCopySuccessSpinner] = useState(false);

  const inputRef = useRef()
  const createPassword = () => {
    setIsGenerated(false);
    setSuccessMessage(false);
    setErrorMessage(false);
    if(inputValue && inputValue < 6) {
      setErrorMessage(true);
      setErrorMessageData(`${inputValue} characters is typical but may not be appropriate. At least 8 characters longer passwords are generally more secure`);
      setIsPrimarySpinner(false)
    } else {
      let _l = inputValue ? parseInt(inputValue) : 8;  
      let _c = rSelected === 1 ? "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789" : "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#!$&*";
      let _r = "";
      let _n = _c.length
      for (let _i = 0; _i < _l; ++_i) {
          _r += _c.charAt(Math.floor(Math.random() * _n));
      }
      if(_r.length == _l){
        setTimeout(() => {
            (inputValue ? setSuccessMessageData(`Successfully generated ${inputValue} digit password`) : setSuccessMessageData(`Successfully generated default ${8} digit password`))
            setSuccessMessage(true);
            setIsGenerated(true);
            setPassword(_r);
            setIsPrimarySpinner(false)
            setCopySuccess(false)
        }, 2500)
      } else {
        setIsGenerated(false)
      }  
    } 
  }

  const handleNumberInput = (value) =>{
    const isNumberValidator = /^[0-9\b]+$/;
    if(isNumberValidator.test(value) || value === ""){
      setInputValue(value)
    }
  }

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(password).then(function() {
      setTimeout(() => {
        setCopySuccess(true)
        setCopySuccessSpinner(false);
      }, 1500)
    }, function() {
      setTimeout(() => {
        setCopySuccess(false)
        setCopySuccessSpinner(false);
      }, 1500)
    });
  }

  const resetPassword = () =>{
    setTimeout(() => {
      setPassword('')
      setInputValue('')
      setSuccessMessage(false);
      setErrorMessage(false);
      setIsGenerated(false);
      setIsSecondarySpinner(false);
    }, 1500)
  }

  return (
    <>
      <Container className="App-header">
        <Row>
          <h1 className="col-md-12">Generate Random Password</h1>
        </Row>
        <Row>
          <Form>
            <FormGroup>
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>Password Length</InputGroupText>
                </InputGroupAddon>
                <Input
                  minLength={1} 
                  maxLength={2}
                  value={inputValue}
                  onChange={(e) => handleNumberInput(e.target.value)}
                />
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <Label style={{fontSize:20}}>Password Types</Label>
              <br/>
              <ButtonGroup>
                <Button outline color="primary" onClick={() => setRSelected(1)} active={rSelected === 1}>
                    Alphabets & Number
                </Button>
                <Button outline color="secondary" onClick={() => setRSelected(2)} active={rSelected === 2}>
                  Special Character
                </Button>
              </ButtonGroup>
            </FormGroup>
            <br/>
            <Button color="primary" size="lg" block onClick={() => {setIsPrimarySpinner(true); createPassword();}}>
              {
                isPrimarySpinner ? (
                  <Spinner color="primary" /> 
                ) : 'Create Password'
              }
            </Button>
            <Button color="secondary" size="lg" block onClick={() => {setIsSecondarySpinner(true); resetPassword();}}>
              {
                isSecondarySpinner ? (
                  <Spinner color="secondary" /> 
                ) : 'Reset Password'
              }
            </Button>
            <br/>
            <br/>
            <Row>
              {
                successMessage && successMessageData !== "" && (
                  <Alert color="primary">
                      {successMessageData}
                  </Alert>
                )
              }

              {
                errorMessage && errorMessageData !== "" && (
                  <Alert color="danger" style={{fontSize:15}}>
                    {errorMessageData}
                  </Alert>
                )
              }
              
            </Row>
            <br />
            <br/>
            {
              isGenerated && (
                <InputGroup>
                  <Input 
                    value={password}
                    readOnly={true}
                    ref={inputRef}
                  />
                  <InputGroupAddon addonType="append">
                    <Button color="info" onClick={() => {setCopySuccessSpinner(true); handleCopyToClipboard()}}>
                        {
                        copySuccessSpinner ? (
                            'Doing Copy...' 
                          ) : (copySuccess ? 'Copied..!' : 'Copy')
                        }
                    </Button>
                  </InputGroupAddon>
                </InputGroup>
              )
            }
          </Form>
        </Row>
      </Container>
    </>

    
  );
}

export default App;
