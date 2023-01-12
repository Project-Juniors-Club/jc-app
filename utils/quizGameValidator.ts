import { QuizGameOptionType } from '@prisma/client';
import { SerializedQuizQuestion, SerializedQuizOption } from '../lib/server/quiz';

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

  const validatedOptions = quizGameOptions.map(option => validateOption(option));
  const invalidResults = validatedOptions.filter(result => !result.valid);
  return invalidResults.length != 0 ? invalidResults.at(0) : { valid: true };
};

const validateOption = (option: SerializedQuizOption) => {
  const { quizGameOptionType, quizGameOptionImage, quizGameOptionText } = option;

  if (quizGameOptionType == QuizGameOptionType.textAndImage && (quizGameOptionImage == null || quizGameOptionText == null)) {
    return { valid: false, message: 'Quiz option type of text and image should have non-null text and image.' };
  }

  if (quizGameOptionType == QuizGameOptionType.image && quizGameOptionImage == null) {
    return { valid: false, message: 'Quiz option type of image should have non-null image.' };
  }

  if (quizGameOptionType == QuizGameOptionType.text && quizGameOptionText == null) {
    return { valid: false, message: 'Quiz option type of text should have non-null text.' };
  }

  return { valid: true };
};

export default validateQuestions;
