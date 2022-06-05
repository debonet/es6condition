const Condition = require( "../src/es6condition.js" );

function sleep( dtm ){
	return new Promise( fOk => setTimeout( fOk, dtm ));
}


test("condition.signal", async () => {

	let s="";

	
	const condition = new Condition();

	async function f(ch) {
		s+=ch;
		await sleep(100);
		condition.signal();
		s+=ch;
	}
	
	// these will run serially, one per second
	f('a,');
	await condition.wait();
	s+="b,";
	
	expect(s).toBe( "a,a,b," );
});
		 
	
test("condition.broadcast", async () => {

	let s="";

	
	const condition = new Condition();

	async function f(ch) {
		s+=ch;
		await sleep(100);
		condition.broadcast();
		s+=ch;
	}

	async function f2(ch) {
		await condition.wait();
		s+=ch;
	}
	
	// these will run serially, one per second
	f('a,');
	f2('b,');
	await condition.wait();
	s+="c,";
	
	expect(s).toBe( "a,a,b,c," );
});
		 

	

	

