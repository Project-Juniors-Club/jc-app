import { SerializedQuizQuestion } from '../../../lib/server/quiz';

export const validateQuestions = (questions: SerializedQuizQuestion[]) => {
  if (questions.length <= 0) {
    return { valid: false, message: 'There should be at least 1 question for each quiz.' };
  }

  const validatedQuestions = questions.map(question => validateQuestion(question));
  const invalidResults = validatedQuestions.filter(result => !result.valid);
  return invalidResults.length != 0 ? invalidResults.at(0) : { valid: true };
};

const validateQuestion = (question: SerializedQuizQuestion) => {
  if (question.quizGameOptions.length <= 0) {
    return { valid: false, message: 'There should be at least 1 option for each question.' };
  }

  const { isMultipleResponse, questionTitle, quizGameOptions } = question;
  const correctOptions = quizGameOptions.filter(option => option.isCorrectOption);

  if (questionTitle.length == 0) {
    return { valid: false, message: 'Question should not be empty.' };
  }

  if (correctOptions.length <= 0) {
    return { valid: false, message: 'There should be at least 1 correct option for each question.' };
  }

  if (!isMultipleResponse && correctOptions.length > 1) {
    return { valid: false, message: 'Only multiple response questions should have more than 1 correct option.' };
  }

  return { valid: true };
};

export default validateQuestions;
