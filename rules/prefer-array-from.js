/**
 * @license MIT
 * @author Martin Giger
 */
"use strict";

const firstElement = (array) => {
    const [ element ] = array;
    return element;
};

module.exports = {
    meta: {
        docs: {
            description: "Prefer using Array.from over spreading an iterable in an array literal. Using Array.from also preserves the original type of TypedArrays while mapping.",
            recommended: true
        },
        schema: [],
        fixable: "code",
        type: "problem",
        messages: {
            preferArrayFrom: "Use Array.from to convert from iterable to array"
        }
    },
    create(context) {
        return {
            "ArrayExpression > SpreadElement:first-child:last-child"(node) {
                node = node.parent;
                context.report({
                    node,
                    messageId: 'preferArrayFrom',
                    fix(fixer) {
                        const { sourceCode } = context;
                        return fixer.replaceText(node, `Array.from(${sourceCode.getText(firstElement(node.elements).argument)})`);
                    }
                });
            }
        };
    }
};
