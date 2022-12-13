const alpha = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

function encrypt(a, b, word) {
console.log(word);
	a = parseInt(a);
	b = parseInt(b);

	for (var i = 0; i < word.length; i++) {

		var alphaIndex = alpha.indexOf(word.toUpperCase()[i]);

		var troublesome = (a * alphaIndex + b) % alpha.length;

		word = word.substring(0, i) + alpha[troublesome] + word.substring(i + 1);
	}
	return word.toLowerCase();
}


function decrypt(a, b, word) {

	a = parseInt(a);
	b = parseInt(b);

	for (var i = 0; i < word.length; i++) {
		a %= alpha.length;

		//Bruteforce the modular invert of the a

		for (var j = 1; j < alpha.length; j++) {
			if ((a * j) % alpha.length == 1)
				var invert = j;
		}

		var alphaIndex = alpha.indexOf(word.toUpperCase()[i]);

		var troublesome = (invert * (alphaIndex - b)) % alpha.length;
		if (troublesome < 0)
			troublesome += alpha.length;
		word = word.substring(0, i) + alpha[troublesome] + word.substring(i + 1);
	}
	return word.toLowerCase();
}