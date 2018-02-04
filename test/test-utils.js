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

/** Fails a test with given error message. */
Test.fail = function(message='') {
  throw new Error(`Test Failure - ${message}`);
}
/** Asserts that expected === actual.  */
Test.assert = function(expected, actual, message='') {
  if(expected !== actual)
    Test.fail(`${message} - Expected=[${expected}], Actual=[${actual}]`);
}
Test.assertTrue = function(value, message='') {
  if(value !== true)
    Test.fail(`${message} - value was not true: ${value}`);
}
Test.assertFalse = function(value, message='') {
  if(value !== false)
    Test.fail(`${message} - value was not true: ${value}`);
}
Test.assertGTZero = function(value, message='') {
  if(!Number.isFinite(value) || !(value > 0))
    Test.fail(`${message} - value is not a finite number greater than zero: ${value}`);
}
Test.assertLTZero = function(value, message='') {
  if(!Number.isFinite(value) || !(value < 0))
    Test.fail(`${message} - value is not a finite number less than zero: ${value}`);
}
Test.assertGTEZero = function(value, message='') {
  if(!Number.isFinite(value) || !(value >= 0))
    Test.fail(`${message} - value is not a finite number greater than or equal to zero: ${value}`);
}
Test.assertLTEZero = function(value, message='') {
  if(!Number.isFinite(value) || !(value <= 0))
    Test.fail(`${message} - value is not a finite number less than or equal to zero: ${value}`);
}
Test.assertException = function(fn, message='') {
  var b = false;
  try { fn(); }
  catch(e) { b = true; }
  if(!b)
    Test.fail(`${message} - Did not throw an exception where one was expected.`);
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
