import wrapPageElementWithTransition from 'helpers/wrapPageElement';
import wrapWithProvider from './wrap-with-provider';

//Redux
export const wrapRootElement = wrapWithProvider;

// Page Transitions
export const wrapPageElement = wrapPageElementWithTransition;
