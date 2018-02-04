"use strict";


/**
 * This is a quickly-thrown-together unit-testing framework.
 * I know there are other solutions but this was just faster than learning them...
 */
function Test(name, fn) {
  this.name = name;
  this.fn = fn;
  
  this.run = function() {
    try { this.fn(); }
    catch(e) { 
      if(typeof e === 'string')
        e = new Error(e);
      return { success: false, error: e };
    }
    
    return { success: true, error: null };
  }
}

/**
 * Asserts that expected === actual. Fails unit test if not.
 */
Test.assert = function(expected, actual, message) {
  if(expected !== actual)
    throw new Error(`Test Failure - ${message} - Expected[${expected}], Actual=[${actual}]`);
}

/**
 * Adds a new test to list of tests to process. Does not run the test.
 * @param name name of the test.
 * @param fn function to run the test. Needs to run without requiring scope.
 */
Test.add = function(name, fn) {
  if(!Test.tests)
    Test.tests = [];
  Test.tests.push(new Test(name, fn));
}

/**
 * Runs all unit tests.
 * @param $ the jQuery object
 * @param target DOM target where results are written
 */
Test.runAll = function($, target) {
  var $target = $(target);
  $target.append($('<div>').text(`Found ${Test.tests.length} tests.`));
  
  for(var i = 0; i < Test.tests.length; i++) {
    var test = Test.tests[i];
    var label = `${i} - ${test.name} - `;
    var $testOut = $('<div>').text(label + 'Running...');
    $target.append($testOut);
    
    var res = test.run();
    if(res.success) {
      $testOut.text(label + `Passed`).css('background-color', '#8f8');
    }
    else {
      $testOut.text(label + `FAILED!`).css('background-color', '#f40').append($('<pre>').text(res.error.message + '\n' + res.error.stack));
    }
  }
  
  $target.append($('<div>').text('Complete'));
}
