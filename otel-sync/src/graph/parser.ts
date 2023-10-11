/* eslint-disable @typescript-eslint/no-explicit-any */
import { parse } from "graphql";
import { DefinitionNode } from "graphql/language/ast";

type SelectionDefintion = {
    selectionSet?: any
} & DefinitionNode;

/**
 * Parses the operation text and returns the selections.
 * 
 * @param opText The operation text to parse.
 * 
 * @returns The selections.
 * 
 * Note: This is a very simple solution and wouldn't work for more complex queries.
 * One possible solution is to introduce a custome direction to tag fields that should 
 * be registered as APIs and then filter the selections based on that:
 * .filter(selection => !!selection.directives.find(directive => directive.name.value === 'isApi'))
*/
export function selectionsFromOpText(opText: string) {
    const node = parse(opText);
    const selections: Record<string, any>[] = [];

    node.definitions.map(async (def: SelectionDefintion) => {
        def.selectionSet.selections.map((selection: SelectionDefintion) => {
            selections.push(selection);
        });
    });

    return selections;
}