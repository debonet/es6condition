module.exports = class Condition {
	// ----------------------------------------------------
	// private members
	#vf = [];	
	
	// ----------------------------------------------------
	// getwhen 
	fpWait(){
		const self = this;
		return new Promise(( fOk ) => {
			self.#vf.push( fOk );
		});
	}
	wait = this.fpWait;

	// ----------------------------------------------------
	fcWaiting(){
		return this.#vf.length;
	}
	waiting = this.fcWaiting;
	
	// ----------------------------------------------------
	// signal / release
	fRelease() {
		let f = this.#vf.shift();
		setImmediate( f );
	}
	release = this.fRelease;
	fSignal = this.fRelease;
	signal = this.fRelease;

	// ----------------------------------------------------
	// broadcast / signalAll / releaseAll
	fReleaseAll() {
		for( let f of this.#vf ){
			setImmediate( f );
		}
		this.#vf = [];
	}
	releaseAll = this.fReleaseAll;
	fBroadcast = this.fReleaseAll;
	broadcast = this.fReleaseAll;
	fSignalAll = this.fReleaseAll;
	signalAll = this.fReleaseAll;

}

