class Condition {
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

	// ----------------------------------------------------
	fcWaiting(){
		return this.#vf.length;
	}
	
	// ----------------------------------------------------
	// signal / release
	fRelease() {
		let f = this.#vf.shift();
		if ( f ){
			setImmediate( f );
		}
	}

	// ----------------------------------------------------
	// broadcast / signalAll / releaseAll
	fReleaseAll() {
		for( let f of this.#vf ){
			setImmediate( f );
		}
		this.#vf = [];
	}
}

// aliases
Condition.prototype.wait = Condition.prototype.fpWait;

Condition.prototype.waiting = Condition.prototype.fcWaiting;

Condition.prototype.release = Condition.prototype.fRelease;
Condition.prototype.fSignal = Condition.prototype.fRelease;
Condition.prototype.signal = Condition.prototype.fRelease;

Condition.prototype.releaseAll = Condition.prototype.fReleaseAll;
Condition.prototype.fBroadcast = Condition.prototype.fReleaseAll;
Condition.prototype.broadcast = Condition.prototype.fReleaseAll;
Condition.prototype.fSignalAll = Condition.prototype.fReleaseAll;
Condition.prototype.signalAll = Condition.prototype.fReleaseAll;


module.exports = Condition;
