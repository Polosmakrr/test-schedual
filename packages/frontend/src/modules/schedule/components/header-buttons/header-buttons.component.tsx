import React, { ChangeEvent } from 'react';
import { Button, Container, InputLabel, TextField } from '@material-ui/core';
import { SPACES } from '../../../theme';

interface Props {
  modalClick: React.MouseEventHandler<HTMLButtonElement>;
  setDay: (value: string) => void;
  setSearch: (value: string) => void;
}
/* eslint newline-per-chained-call: ["error", { "ignoreChainWithDepth": 5 }] */

export const HeaderButtonsComponent = ({ modalClick, setSearch, setDay }: Props) => (
  <Container style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: SPACES.m }}>
    <Container style={{ display: 'flex', padding: 0 }}>
      <Button
        variant="outlined"
        color="primary"
        size="small"
        style={{ marginRight: SPACES.l }}
        onClick={modalClick}
      >
        Add new route
      </Button>
      <InputLabel style={{ display: 'flex', flexDirection: 'column' }}>
        Filter by Day
        <TextField
          type="date"
          variant="outlined"
          size="small"
          onChange={(event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
            setDay(event.currentTarget.value)
          }
        />
      </InputLabel>
    </Container>
    <TextField
      type="text"
      label="Search &#128270;"
      onChange={(event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setSearch(event.target.value);
      }}
    />
  </Container>
);
