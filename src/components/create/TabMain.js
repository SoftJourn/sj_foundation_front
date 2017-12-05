import React from 'react';
import Input from '../input/Input';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import '../../../node_modules/react-datepicker/dist/react-datepicker.css';

export class TabMain extends React.Component {

    render() {
        return (
            <div className="row">
                <div className="col tab-inner">
                    <Input className="input-full-width" label="Project name" placeholder="Enter name here"/>

                    <Input label="Price" placeholder="0"/>

                    <div className="pretty p-default">
                        <input type="checkbox" />
                        <div className="state">
                            <label>Can donate more</label>
                        </div>
                    </div>

                    <div>
                        <label>Due date</label>
                        <DatePicker />
                    </div>

                    <div>
                        <label>Category</label>
                        <Select
                            name="form-field-name"
                            value={{ value: 'Social', label: 'Social' }}
                            options={[
                                { value: 'Social', label: 'Social' },
                                { value: 'Art', label: 'Art' },
                                { value: 'Design', label: 'Design' },
                                { value: 'Film&Video', label: 'Film&Video' },
                                { value: 'Food', label: 'Food' }
                            ]}
                        />
                    </div>

                    <div className="text-center">
                        <button className="btn btn-rounded">Next</button>
                    </div>
                    
                </div>
            </div>
        );
    }

}

export default TabMain;