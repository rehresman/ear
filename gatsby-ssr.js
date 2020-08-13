import React from 'react';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';
import wrapPageElementWithTransition from 'helpers/wrapPageElement';
import wrapWithProvider from './wrap-with-provider';

export const replaceRenderer = ({
	bodyComponent,
	replaceBodyHTMLString,
	setHeadComponents,
}) => {
	// React Context in SSR/build
	const ConnectedBody = wrapWithProvider;
	replaceBodyHTMLString(renderToString(<ConnectedBody />));

	// Add styled-components in SSR/build
	const sheet = new ServerStyleSheet();
	const bodyHTML = renderToString(sheet.collectStyles(<ConnectedBody />));
	const styleElement = sheet.getStyleElement();
	setHeadComponents(styleElement);
};

// Page Transitions
export const wrapPageElement = wrapPageElementWithTransition;

//Redux

//export const wrapRootElement = wrapWithProvider;
