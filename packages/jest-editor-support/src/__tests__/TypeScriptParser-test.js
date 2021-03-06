/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

const {parse} = require('../TypeScriptParser');

const path = require('path');
const fixtures = path.resolve(__dirname, 'fixtures');

describe('File Parsing for it blocks', () => {

  it('For the simplest it cases', async () => {
    const data = parse(`${fixtures}/global_its.example`);

    expect(data.itBlocks.length, 7);

    const firstIt = data.itBlocks[0];
    expect(firstIt.name).toEqual('works with old functions');
    expect(firstIt.start).toEqual({column: 0, line: 1});
    expect(firstIt.end).toEqual({column: 2, line: 3});

    const secondIt = data.itBlocks[1];
    expect(secondIt.name).toEqual('works with new functions');
    expect(secondIt.start).toEqual({column: 0, line: 5});
    expect(secondIt.end).toEqual({column: 2, line: 7});

    const thirdIt = data.itBlocks[2];
    expect(thirdIt.name).toEqual('works with flow functions');
    expect(thirdIt.start).toEqual({column: 0, line: 9});
    expect(thirdIt.end).toEqual({column: 2, line: 11});

    const fourthIt = data.itBlocks[3];
    expect(fourthIt.name).toEqual('works with it.only');
    expect(fourthIt.start).toEqual({column: 0, line: 13});
    expect(fourthIt.end).toEqual({column: 2, line: 15});

    const fifthIt = data.itBlocks[4];
    expect(fifthIt.name).toEqual('works with fit');
    expect(fifthIt.start).toEqual({column: 0, line: 17});
    expect(fifthIt.end).toEqual({column: 2, line: 19});

    const sixthIt = data.itBlocks[5];
    expect(sixthIt.name).toEqual('works with test');
    expect(sixthIt.start).toEqual({column: 0, line: 21});
    expect(sixthIt.end).toEqual({column: 2, line: 23});

    const seventhIt = data.itBlocks[6];
    expect(seventhIt.name).toEqual('works with test.only');
    expect(seventhIt.start).toEqual({column: 0, line: 25});
    expect(seventhIt.end).toEqual({column: 2, line: 27});
  });

  it('For its inside describes', async () => {
    const data = parse(`${fixtures}/nested_its.example`);

    expect(data.itBlocks.length, 6);

    const firstIt = data.itBlocks[0];
    expect(firstIt.name).toEqual('1');
    expect(firstIt.start).toEqual({column: 2, line: 1});
    expect(firstIt.end).toEqual({column: 4, line: 2});

    const secondIt = data.itBlocks[1];
    expect(secondIt.name).toEqual('2');
    expect(secondIt.start).toEqual({column: 2, line: 3});
    expect(secondIt.end).toEqual({column: 4, line: 4});

    const thirdIt = data.itBlocks[2];
    expect(thirdIt.name).toEqual('3');
    expect(thirdIt.start).toEqual({column: 2, line: 8});
    expect(thirdIt.end).toEqual({column: 4, line: 9});

    const fourthIt = data.itBlocks[3];
    expect(fourthIt.name).toEqual('4');
    expect(fourthIt.start).toEqual({column: 2, line: 13});
    expect(fourthIt.end).toEqual({column: 4, line: 14});

    const fifthIt = data.itBlocks[4];
    expect(fifthIt.name).toEqual('5');
    expect(fifthIt.start).toEqual({column: 2, line: 18});
    expect(fifthIt.end).toEqual({column: 4, line: 19});

    const sixthIt = data.itBlocks[5];
    expect(sixthIt.name).toEqual('6');
    expect(sixthIt.start).toEqual({column: 2, line: 23});
    expect(sixthIt.end).toEqual({column: 4, line: 24});
  });

  // These tests act more like linters that we don't raise on non-trivial files
  // taken from some Artsy codebases, which are MIT licensed.

  it('For a danger test file (which has flow annotations)', async () => {
    const data = parse(`${fixtures}/dangerjs/travis-ci.example`);
    expect(data.itBlocks.length).toEqual(7);
  });

  it('For a danger flow test file ', async () => {
    const data = parse(`${fixtures}/dangerjs/github.example`);
    expect(data.itBlocks.length).toEqual(2);
  });

  it('For a metaphysics test file', async () => {
    const data = parse(`${fixtures}/metaphysics/partner_show.example`);
    expect(data.itBlocks.length).toEqual(8);
  });
});

describe('File Parsing for expects', () => {

  it('finds Expects in a danger test file', async () => {
    const data = parse(`${fixtures}/dangerjs/travis-ci.example`);
    expect(data.expects.length).toEqual(7);
  });

  it('finds Expects in a danger flow test file ', async () => {
    const data = parse(`${fixtures}/dangerjs/github.example`);
    expect(data.expects.length).toEqual(2);
  });

  it('finds Expects in a metaphysics test file', async () => {
    const data = parse(`${fixtures}/metaphysics/partner_show.example`);
    // Not currently checking inside function calls
    expect(data.expects.length).toEqual(0);
  });
});
