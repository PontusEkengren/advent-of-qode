import React, { useEffect, useState } from 'react';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import enGB from 'date-fns/locale/en-GB';
import { Button, Content, FlexInputContainer, Group, Row } from './Styled/defaults';
import { FormControl, FormControlLabel, Radio, RadioGroup, TextField } from '@material-ui/core';
import * as api from './api.js';

export default function AdminView({ token, onTokenRefresh }) {
  const [date, setDate] = useState(moment(`${moment().year()}-12-01`).toDate());
  const [question, setQuestion] = useState();
  const [options, setOptions] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [saveStatus, setSaveStatus] = useState();

  registerLocale('en-GB', enGB);

  const thisYear = moment().year();
  const startMoment = moment(`${thisYear}-12-01`);
  const startDate = startMoment.toDate();

  useEffect(() => {
    if (date) {
      const day = moment(date).format('DD');
      api
        .getQueryAsAdmin(day, token)
        .then((response) => {
          setQuestion(response.data.question);

          if (response.data.options?.length) {
            setOptions(response.data.options.map((o, index) => ({ ...o, id: index })));
          } else {
            setOptions([{ text: 'Option nr 1', id: 0, isCorrectAnswer: false }]);
          }

          setErrorMessage(null);
        })
        .catch((err) => {
          if (err?.response?.status === 401) {
            setErrorMessage('Unauthorized');
          }
        });
    }
    // eslint-disable-next-line
  }, [date, token]);

  const handleSave = () => {
    api
      .addOrUpdateQuestion(moment(date).format('D'), question, options, token)
      .then(() => {
        setErrorMessage(null);
        setSaveStatus(' ✓ ');
        setTimeout(() => {
          setSaveStatus();
        }, 1200);
      })
      .catch((err) => {
        if (err?.response?.status === 401) {
          setErrorMessage('Unauthorized');
          onTokenRefresh();
        }
        if (err?.response?.data) setErrorMessage(err?.response?.data);
      });
  };

  const handleLabelChange = (event, optionId) => {
    let newOptions = options.map((o) => ({ ...o, text: o.id === optionId ? event.target.value : o.text }));
    setOptions(newOptions);
  };

  const lessOptions = () => {
    if (options && options.length > 1) {
      const newOptions = options.slice(0, options.length - 1);
      setOptions(newOptions);
    }
  };

  const moreOptions = () => {
    if (options) {
      const newOptions = [
        ...options,
        { text: `Option nr ${options.length + 1}`, id: options.length, isCorrectAnswer: false },
      ];
      setOptions(newOptions);
    }
  };
  return (
    <Content>
      <Row>
        <ReactDatePicker
          selected={date}
          onChange={(date) => setDate(date)}
          minDate={startDate}
          maxDate={startMoment.add(23, 'days').toDate()}
          placeholderText='Only days until cristmas available for selection'
          dateFormat={'yyyy-MM-dd'}
          locale='en-GB'
        />
      </Row>
      <Row>
        <h2>{errorMessage}</h2>
      </Row>

      <Row>
        <TextField
          multiline
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          style={{ width: 400 }}
        ></TextField>
      </Row>
      <Row>
        <>
          <Button onClick={lessOptions} style={{ marginTop: 35 }}>
            -
          </Button>
          <Button disabled>Options</Button>
          <Button onClick={moreOptions} style={{ marginTop: 35 }}>
            +
          </Button>
        </>
      </Row>
      <Row>
        {options && (
          <>
            <Group>
              <FormControl component='fieldset'>
                <RadioGroup
                  aria-label='gender'
                  name='gender1'
                  value={'value'}
                  onChange={(e, id) => {
                    let newOptions = options.map((o) => ({
                      ...o,
                      isCorrectAnswer: `${o.id}` === id ? true : false,
                    }));
                    setOptions(newOptions);
                  }}
                >
                  {options.map((o, i) => (
                    <FlexInputContainer key={`FlexInputContainer${i}`}>
                      <FormControlLabel
                        key={`FormControlLabel${i}`}
                        value={o.id}
                        control={<Radio />}
                        label={<TextField value={o.text} onChange={(e) => handleLabelChange(e, o.id)} />}
                        checked={o.isCorrectAnswer}
                      />
                    </FlexInputContainer>
                  ))}
                </RadioGroup>
              </FormControl>
            </Group>
          </>
        )}
      </Row>
      <Row>
        <Button onClick={handleSave} style={{ marginTop: 35 }}>
          Save {saveStatus}
        </Button>
      </Row>
    </Content>
  );
}
