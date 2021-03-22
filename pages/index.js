import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { connect } from 'react-redux';
import {betBlack, betRed, getRouletteData} from "../redux/actions";

const Roulette = dynamic(() => import('../components/roulette'), { ssr: false });

const styles = {
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'rgb(86 135 63)',
    height: '100vh',
    width: '100vw',
    padding: 40,
  },
  button: {
    cursor: 'pointer',
    padding: '10px 20px',
  },
  bets: {
    padding: '10px 20px',
    fontSize: '16px',
    fontWeight: 'bold',
    color: 'white',
  }
}

const LIMIT_BETS = 10;

const RoulettePage = ({ bets, roulette, getRouletteData, betRed, betBlack }) => {
  const [ disabled, setDisabled ] = useState(false);
  const getRouletteDataHandler = () => {
    getRouletteData();
  };

  useEffect(() => {
    if (disabled) {
      const id = setTimeout(() => {
        setDisabled(false);
      },  10000);

      return () => {
        clearTimeout(id);
      };
    }
  }, [ disabled ]);

  return (
    <div style={styles.wrapper}>
      <button disabled={disabled} onClick={() => {
        getRouletteDataHandler();
        betRed();
        setDisabled(true);
      }} style={styles.button}>
        RED
      </button>
      <button disabled={disabled} onClick={() => {
        getRouletteDataHandler();
        betBlack();
        setDisabled(true);
      }} style={styles.button}>
        BLACK
      </button>
      <Roulette drop={roulette.get('drop')} />
      <div style={styles.bets}>
        Bets:
        {
          bets.get('bets').toArray().slice(-LIMIT_BETS).map((bet) => (
            <div>
              { bet }
            </div>
          ))
        }
      </div>
      <div style={styles.bets}>
        Drops:
        {
          bets.get('drops').toArray().slice(-LIMIT_BETS).map((drop) => (
            <div>
              { drop }
            </div>
          ))
        }
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  roulette: state.get('roulette'),
  bets: state.get('bets')
});

export default connect(mapStateToProps, { betRed, betBlack, getRouletteData })(RoulettePage);