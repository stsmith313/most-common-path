/*globals expect spyOn fail fit*/
var MostCommonPathFinder = require('../../MostCommonPathFinder');
var fsp = require('fs-promise');

describe('Most Common 3 page Sequence', function(){
  var validLogFilePath = './fakeLog.log';
  
  
  describe('MostCommonPathFinder', function(){
    describe('#findPath', function(){
      it('returns a promise', function(){
        expect(MostCommonPathFinder.findPath(validLogFilePath) instanceof Promise).toBe(true);
      })
      
      it('searches onDisk for filepath param', function(done){
        var mySpy = new spyOn(fsp, 'readFile').and.returnValue(Promise.resolve('whocares'));
        MostCommonPathFinder.findPath('banana').then(() => {
          expect(mySpy).toHaveBeenCalledWith('banana', 'utf8')
          done();
        }).catch(fail)
      })
      
      it('returns expected value', function(done){
        var fakeLogData = `
1 /1
1 /2
1 /3
1 /4
2 /2
2 /3
2 /4
`
        var expectedResponse = ['/2', '/3', '/4'];
        var mySpy = new spyOn(fsp, 'readFile').and.returnValue(Promise.resolve(fakeLogData));
        MostCommonPathFinder.findPath('banana').then((response) => {
          expect(response).toEqual(expectedResponse);
          done();
        }).catch(fail)
      })
    })
  });
})



