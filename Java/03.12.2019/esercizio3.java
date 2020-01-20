class esercizio3 {
	public static void main(String args[]) {
		int nums[] = {50,10,15,20,25,30,45,70,90,120};
		int min, max;
		min = max = nums[0];
		for (int i=1; i < 10; i++) {
			if(nums[i] < min) min = nums[i];
			if(nums[i] > max) max = nums[i];
		}
		System.out.println("Min and max: " + min + " " + max);
	}
}