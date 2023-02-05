import { useState } from 'react';
import Statistics from './Statistics/Statistics';
import FeedbackOptions from './FeedbackOptions/FeedbackOptions';
import Section from './Section/Section';
import Notification from './Notification/Notification';

export const App = () => {
  const [feedback, setfeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const total = feedback.good + feedback.neutral + feedback.bad;

  const addFeedback = responce => {
    setfeedback(prevState => ({
      ...prevState,
      [responce]: prevState[responce] + 1,
    }));
  };
  console.log(feedback);

  const countPositiveFeedbackPercentage = () => {
    if (!total) {
      return 0;
    }
    const result = ((feedback.good / total) * 100).toFixed(2);
    return Number(result);
  };

  return (
    <>
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={Object.keys(feedback)}
          onLeaveFeedback={addFeedback}
        />
      </Section>

      {total !== 0 && (
        <Section title="Statistics">
          <Statistics
            good={feedback.good}
            neutral={feedback.neutral}
            bad={feedback.bad}
            total={total}
            positivePercentage={countPositiveFeedbackPercentage()}
          />
        </Section>
      )}
      {total === 0 && <Notification message="There is no feedback" />}
    </>
  );
};
