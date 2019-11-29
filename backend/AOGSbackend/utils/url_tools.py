from urllib import parse


def url_join(*args: str):
    paths = iter(args)
    ret = ''
    try:
        ret = next(paths).rstrip('/')
        for path in paths:
            ret += '/' + path.strip('/')
    except StopIteration:
        pass
    return ret


def set_params(url: str, **kwargs):
    return url.rstrip('?') + '?' + parse.urlencode(kwargs)


def add_params(url: str, **kwargs):
    return url.rstrip('&') + '&' + parse.urlencode(kwargs)
