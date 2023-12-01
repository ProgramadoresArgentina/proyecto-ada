import Link from "next/link";

export default function PostContentFooter({ hashtags }) {
	return (
		<small className="text-gray-500 flex gap-3 flex-wrap">
			{hashtags?.map(({ id, name }) => (
				<Link title={name} href={{ pathname: '/blog', query: { hashtag: name.toString() } }}
                key={id}>
					#{name}
				</Link>
			))}
		</small>
	);
}
