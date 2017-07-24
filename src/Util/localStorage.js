import MemoryStorage from 'memorystorage';

const getStorage = () => {
	try {
		const x = 'test-localstorage-' + Date.now();

		localStorage.setItem(x, x);
		const y = localStorage.getItem(x);

		localStorage.removeItem(x);
		if (y !== x) {
			throw new Error();
		}
		// localStorage is fully functional!
		return localStorage;
	} catch (e) {
		// fall back to a memory-based implementation
		return new MemoryStorage('shakacode');
	}
};

export default getStorage();
