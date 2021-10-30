import React, { useEffect, useState } from 'react';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import enGB from 'date-fns/locale/en-GB';
import { Body, FlexContainer, FlexInputContainer, Group, Row } from './Styled/defaults';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { FormControl, FormControlLabel, Radio, RadioGroup, TextField } from '@material-ui/core';
import * as api from './api.js';

export default function AdminView({ token }) {
  const [date, setDate] = useState();
  const [question, setQuestion] = useState();
  const [options, setOptions] = useState();
  const [errorMessage, setErrorMessage] = useState();

  registerLocale('en-GB', enGB);

  const thisYear = moment().year();
  const startMoment = moment(`${thisYear}-12-01`);
  const startDate = startMoment.toDate();

  useEffect(() => {
    console.log('token', token);
    if (date) {
      const day = moment(date).format('DD');
      console.log('day', day);
      api
        .getQueryAsAdmin(day, token)
        .then((response) => {
          console.log('response.data', response.data);

          setQuestion(response.question);

          if (response.options?.length) {
            setOptions(response.options);
          }

          setErrorMessage(null);
        })
        .catch((err) => {
          if (err?.response?.status === 403) {
            setErrorMessage('Unauthorized');
          }
        });
    }
  }, [date]);

  const theme = createMuiTheme({ palette: { type: 'dark' } });

  return (
    <Body>
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
        <TextField>{question}</TextField>
      </Row>
      <Row>
        {options && (
          <ThemeProvider theme={theme}>
            <Group>
              <FormControl component='fieldset'>
                <RadioGroup aria-label='gender' name='gender1' value={'value'} onChange={(e) => {}}>
                  {options.map((o, i) => (
                    <FlexInputContainer key={`FlexInputContainer${i}`}>
                      <FormControlLabel
                        key={`FormControlLabel${i}`}
                        value={o}
                        control={<Radio />}
                        label={o}
                        // checked={}
                      />
                    </FlexInputContainer>
                  ))}
                </RadioGroup>
              </FormControl>
            </Group>
          </ThemeProvider>
        )}
      </Row>
    </Body>
  );
}
