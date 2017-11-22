import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { COLOR_SCHEME_DEFAULT } from 'utils/constants'
import AddOutcome from './AddOutcome'
import Outcome from './Outcome'

import './formOutcomeList.less'

class FormOutcomeList extends Component {
  addOutcome = (event) => {
    event.preventDefault()
    this.props.fields.push('')
  }

  addOutcomeOnChange = (event) => {
    const { fields } = this.props
    const { target } = event
    const { value } = target
    const index = +target.getAttribute('data-index')

    // new outcome is added when user started typing inside the last field
    const addNewOutcome = index === fields.length - 1 && value != null && value.length > 0
    if (addNewOutcome) {
      fields.push('')
    }
  }

  removeOutcome = (event) => {
    event.preventDefault()
    const { fields } = this.props
    const index = event.target.getAttribute('data-index')
    fields.remove(index)
  }

  render() {
    const { fields, label, meta: { error, invalid } } = this.props
    const showDeleteButton = fields.length > 2
    const addOutcomeLabel = 'Add'
    const deleteOutcomeLabel = 'Delete'

    return (
      <div className="formOutcomeList">
        <label htmlFor="outcomes" className="formOutcomeList__label">
          {label}
        </label>
        {fields.map((field, index) => {
          const outcomeEntryStyle = {
            backgroundColor: COLOR_SCHEME_DEFAULT[index],
          }

          return (
            <Outcome
              key={index}
              index={index}
              field={field}
              showDeleteButton={showDeleteButton}
              onChange={this.addOutcomeOnChange}
              outcomeEntryStyle={outcomeEntryStyle}
              deleteOutcomeLabel={deleteOutcomeLabel}
              onDeleteClick={this.removeOutcome}
            />
          )
        })}
        <AddOutcome text={addOutcomeLabel} onClick={this.addOutcome} />
        {invalid && error && <span>{error}</span>}
      </div>
    )
  }
}

FormOutcomeList.propTypes = {
  fields: PropTypes.shape({
    push: PropTypes.func,
    remove: PropTypes.func,
  }).isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
  }),
  label: PropTypes.string,
}

export default FormOutcomeList
