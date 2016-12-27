import React from 'react';
import { connect } from 'react-redux';

const DetectSongButton = ({ text, onClick }) => (
  <button onClick={onClick}>{text}</button>
);

const mapStateToProps = (state) => ({
  text: 'Detect Song'
});

export default connect(mapStateToProps)(DetectSongButton);
