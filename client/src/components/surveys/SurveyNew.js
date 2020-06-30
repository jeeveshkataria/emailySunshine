//survey new shows survey form 
//  and survey form review

import React , { Component } from 'react';
import surveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

class SurveyNew extends Component {

    state = { showFormReview : false };

    renderContent() {
        if(this.state.showFormReview){
            return <SurveyFormReview />;
        }

        return <SurveyForm 
        onSurveySubmit = {() => this.setState({ showFormReview : true })}
         />;
    } 
    render() {
        return (
           <div>
               {this.renderContent()}
           </div> 
        );
    }
}


export default SurveyNew;