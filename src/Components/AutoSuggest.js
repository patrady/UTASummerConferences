import React from 'react';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  container: {
    position: 'relative',
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  divider: {
    height: theme.spacing.unit * 2,
  },
});

class IntegrationAutosuggest extends React.Component {
  constructor(props) {
    super(props);

    const { value, suggestions } = this.props;
    this.accessor = this.props.accessor;

    this.state = {
      single: value,
      baseSuggestions: suggestions,
      suggestions: suggestions,
      selectedSuggestion: null,
    };

    this.renderSuggestion = this.renderSuggestion.bind(this);
  }

  renderInputComponent(inputProps) {
    const { classes, label, inputRef = () => { }, ref, ...other } = inputProps;
  
    return (
      <TextField
        label={label}
        InputProps={{
          inputRef: node => {
            ref(node);
            inputRef(node);
          },
          classes: {
            input: classes.input,
          },
        }}
        {...other}
      />
    );
  }

  getSuggestions(suggestions, value) {
    return suggestions.reduce((all, x) => {
      if (x && x[this.accessor].toLowerCase().includes(value.toLowerCase()))
        all.push(x);
      return all;
    }, [])
  }

  renderSuggestion(suggestion, { query, isHighlighted }) {  
    let parts = [];
    let start = 0, index = 0;
  
    // Highlight any part of the word that contains the search string - case insensitive
    while ((index = suggestion[this.accessor].toLowerCase().indexOf(query.toLowerCase(), start)) !== -1) {
      
      parts.push({text: suggestion[this.accessor].substring(start, index), highlight: false })
      parts.push({text: suggestion[this.accessor].substring(index, index + query.length), highlight: true})
  
      start = index + query.length;
    }
    parts.push({text: suggestion[this.accessor].substring(start), highlight: false })
  
    return (
      <MenuItem selected={isHighlighted} component="div">
        <div>
          {parts.map((part, index) => {
            return part.highlight ? (
              <span key={String(index)} style={{ fontWeight: 500 }}>
                {part.text}
              </span>
            ) : (
                <strong key={String(index)} style={{ fontWeight: 300 }}>
                  {part.text}
                </strong>
              );
          })}
        </div>
      </MenuItem>
    );
  }

  handleSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(this.state.baseSuggestions, value),
    });
  };

  handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  handleChange = name => (event, { newValue }) => {
    this.setState({
      [name]: newValue,
    });
  };

  getSuggestionValue = suggestion => {
    const {onChange} = this.props;
    onChange(suggestion);
    return suggestion[this.accessor];
  };

  render() {
    const { classes, label } = this.props;

    const autosuggestProps = {
      renderInputComponent: this.renderInputComponent,
      suggestions: this.state.suggestions,
      onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
      onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
      getSuggestionValue: this.getSuggestionValue,
      renderSuggestion: this.renderSuggestion,
    };

    return (
      <div className={classes.root}>
        <Autosuggest
          {...autosuggestProps}
          inputProps={{
            classes,
            label: label,
            value: this.state.single,
            onChange: this.handleChange('single'),
          }}
          theme={{
            container: classes.container,
            suggestionsContainerOpen: classes.suggestionsContainerOpen,
            suggestionsList: classes.suggestionsList,
            suggestion: classes.suggestion,
          }}
          renderSuggestionsContainer={options => (
            <Paper {...options.containerProps} square>
              {options.children}
            </Paper>
          )}
        />
      </div>
    );
  }
}

IntegrationAutosuggest.propTypes = {
  classes: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  suggestions: PropTypes.arrayOf(PropTypes.object).isRequired,
  accessor: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default withStyles(styles)(IntegrationAutosuggest);
